package org.hse.probujdenie.config;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.hse.probujdenie.service.content.CourseService;
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
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class ApplicationStartupListener {

    private final FileSaverService fileSaverService;
    private final CourseService courseService;

    @Value("${app.bootstrap.enabled:true}")
    private boolean enabled;

    @Profile("!test")
    @EventListener(ApplicationReadyEvent.class)
    public void onApplicationReady() {
        if (enabled && !fileSaverService.bucketExists(CommonConstants.FileSaverConstants.BUCKET)) {
            fileSaverService.createBucketIfNotExists(CommonConstants.FileSaverConstants.BUCKET);
            List<String> fileNames = getImageFileNames();
            System.out.println(fileNames.getFirst());
            for (String fileName : fileNames) {
                MultipartFile file = resourceToMultipartFile(new ClassPathResource("images/" + fileName));
                UUID photoId = fileSaverService.save(file);
                System.out.println(photoId);
                String courseId = file.getOriginalFilename().substring(0, file.getOriginalFilename().indexOf("."));
                courseService.updateCoursePhoto(UUID.fromString(courseId), photoId);
            }
        }
    }

    private List<String> getImageFileNames() {
        ResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();
        String pattern = "classpath*:images/*.png";

        try {
            Resource[] resources = resolver.getResources(pattern);

            return Arrays.stream(resources)
                    .filter(Resource::isReadable)
                    .map(Resource::getFilename)
                    .sorted()
                    .collect(Collectors.toList());

        } catch (IOException e) {
            return List.of();
        }
    }

    public MultipartFile resourceToMultipartFile(ClassPathResource resource) {

        String contentType = "image/png";
        String fileName = resource.getFilename();
        try {
            byte[] content = resource.getInputStream().readAllBytes();

            return new MockMultipartFile(
                    "file",
                    fileName,
                    contentType,
                    content
            );
        } catch (Exception e){
            return null;
        }
    }
}
