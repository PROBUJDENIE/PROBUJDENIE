package org.hse.probujdenie.config;

import lombok.RequiredArgsConstructor;
import org.hse.probujdenie.service.content.CourseService;
import org.hse.probujdenie.service.content.LectureService;
import org.hse.probujdenie.service.fileSaver.FileSaverService;
import org.hse.probujdenie.util.CommonConstants;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.annotation.Profile;
import org.springframework.context.event.EventListener;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.core.io.support.ResourcePatternResolver;
import org.springframework.http.MediaType;
import org.springframework.http.MediaTypeFactory;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class ApplicationStartupListener {

    private final FileSaverService fileSaverService;
    private final CourseService courseService;
    private final LectureService lectureService;

    @Value("${app.bootstrap.enabled:true}")
    private boolean enabled;

    @Profile("!test")
    @EventListener(ApplicationReadyEvent.class)
    public void onApplicationReady() {
        if (enabled && !fileSaverService.bucketExists(CommonConstants.FileSaverConstants.BUCKET)) {
            fileSaverService.createBucketIfNotExists(CommonConstants.FileSaverConstants.BUCKET);
            List<String> fileNames = getResourceFileNames("png", "json");

            for (String fileName : fileNames) {
                MultipartFile file = resourceToMultipartFile(new ClassPathResource("startFiles/" + fileName));
                UUID fileId = fileSaverService.save(file);
                String[] partsOfFile = file.getOriginalFilename().split("\\.");
                if (partsOfFile[1].equals("json")){
                    String lectureId = partsOfFile[0];
                    lectureService.updateLectureContent(UUID.fromString(lectureId), fileId);
                }else {
                    String courseId = partsOfFile[0];
                    courseService.updateCoursePhoto(UUID.fromString(courseId), fileId);
                }
            }
        }
    }

    private List<String> getResourceFileNames(String... exts) {
        ResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();

        String joined = String.join(",", exts);
        String pattern = "classpath*:" + "startFiles" + "/*.{"+ joined + "}";

        try {
            Resource[] resources = resolver.getResources(pattern);

            return Arrays.stream(resources)
                    .filter(Resource::isReadable)
                    .map(Resource::getFilename)
                    .filter(Objects::nonNull)
                    .sorted()
                    .toList();

        } catch (IOException e) {
            return List.of();
        }
    }

    private MultipartFile resourceToMultipartFile(ClassPathResource resource) {
        String fileName = resource.getFilename();

        String contentType = MediaTypeFactory.getMediaType(fileName)
                .map(MediaType::toString)
                .orElse(MediaType.APPLICATION_OCTET_STREAM_VALUE);

        try (InputStream in = resource.getInputStream()) {
            byte[] content = in.readAllBytes();
            return new MockMultipartFile("file", fileName, contentType, content);
        } catch (Exception e) {
            throw new RuntimeException("Ошибка чтения файла " + fileName, e);
        }
    }


}
