package org.hse.probujdenie.controller;

import lombok.RequiredArgsConstructor;
import org.hse.probujdenie.api.FileSaverApiDelegate;
import org.hse.probujdenie.api.model.*;
import org.hse.probujdenie.service.fileSaver.FileSaverService;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@Controller
@RequiredArgsConstructor
public class FileSaverController implements FileSaverApiDelegate {

    private final FileSaverService fileSaverService;


    @Override
    public ResponseEntity<Resource> getPhoto(UUID photoId) {
        byte[] bytes = fileSaverService.getPhoto(photoId);
        Resource resource = new ByteArrayResource(bytes);

        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_PNG)
                .contentLength(bytes.length)
                .body(resource);
    }

    @Override
    public ResponseEntity<SaveCoursePhotoResponseDto> savePhoto(MultipartFile photo) {
        try {
            UUID savedKey = fileSaverService.savePhotoCourse(photo.getBytes());
            SaveCoursePhotoResponseDto response = new SaveCoursePhotoResponseDto();
            response.setPhotoId(savedKey);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            throw new IllegalArgumentException(e.getMessage());
        }
    }

    @Override
    public ResponseEntity<SaveLectureContentResponseDto> saveLectureContent(SaveLectureContentRequestDto saveLectureContentRequestDto) {
        try {
            UUID savedKey = fileSaverService.saveLectureContent(saveLectureContentRequestDto.getContent().getBytes());
            SaveLectureContentResponseDto response = new SaveLectureContentResponseDto();
            response.setContentId(savedKey);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            throw new IllegalArgumentException(e.getMessage());
        }
    }

    @Override
    public ResponseEntity<GetLectureContentResponseDto> getLectureContent(GetLectureContentRequestDto getLectureContentRequestDto) {
        byte[] bytes = fileSaverService.getLectureContent(getLectureContentRequestDto.getContentId());
        GetLectureContentResponseDto response = new GetLectureContentResponseDto();
        response.content(new String(bytes));
        return ResponseEntity.ok(response);
    }
}
