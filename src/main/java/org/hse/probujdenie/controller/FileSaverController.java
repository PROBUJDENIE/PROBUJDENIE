package org.hse.probujdenie.controller;

import lombok.RequiredArgsConstructor;
import org.hse.probujdenie.api.FileSaverApiDelegate;
import org.hse.probujdenie.api.model.*;
import org.hse.probujdenie.model.fileSaver.FileData;
import org.hse.probujdenie.service.fileSaver.FileSaverService;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@Controller
@RequiredArgsConstructor
public class FileSaverController implements FileSaverApiDelegate {

    private final FileSaverService fileSaverService;

    @Override
    public ResponseEntity<Resource> get(String id) {
        FileData fileData = fileSaverService.get(id);

        return ResponseEntity.ok()
                .headers(fileData.getHttpHeaders())
                .body(fileData.getInputStreamResource());
    }

    @Override
    public ResponseEntity<SaveFileSaverResponseDto> save(MultipartFile file) {
        UUID id = fileSaverService.save(file);

        SaveFileSaverResponseDto response = new SaveFileSaverResponseDto();
        response.setId(id);

        return ResponseEntity.ok(response);
    }
}
