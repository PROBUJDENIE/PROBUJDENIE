package org.hse.probujdenie.controller.content;

import lombok.RequiredArgsConstructor;
import org.hse.probujdenie.api.LectureApiDelegate;
import org.hse.probujdenie.api.model.*;
import org.hse.probujdenie.mapper.LectureMapper;
import org.hse.probujdenie.model.content.Lecture;
import org.hse.probujdenie.service.content.LectureService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import java.util.List;
import java.util.UUID;

@Controller
@RequiredArgsConstructor
public class LectureController implements LectureApiDelegate {

    private final LectureService lectureService;
    private final LectureMapper lectureMapper;

    @Override
    public ResponseEntity<BaseResponseDto> createLecture(LectureCreateRequestDto lectureCreateRequestDto) {
        Lecture lecture = lectureMapper.toEntity(lectureCreateRequestDto);
        lectureService.createLecture(lectureCreateRequestDto.getSectionId(), lecture);
        return ResponseEntity.ok(new BaseResponseDto(true));
    }

    @Override
    public ResponseEntity<BaseResponseDto> updateLecture(LectureUpdateRequestDto lectureUpdateRequestDto) {
        Lecture lecture = lectureMapper.toEntity(lectureUpdateRequestDto);
        lectureService.updateLecture(lecture);
        return ResponseEntity.ok(new BaseResponseDto(true));
    }

    @Override
    public ResponseEntity<BaseResponseDto> deleteLecture(LectureDeleteRequestDto lectureDeleteRequestDto) {
        lectureService.deleteLecture(lectureDeleteRequestDto.getLectureId());
        return ResponseEntity.ok(new BaseResponseDto(true));
    }

    @Override
    public ResponseEntity<LectureGetLectureResponseDto> getLecture(UUID id) {
        Lecture lecture = lectureService.getLecture(id);

        LectureGetLectureResponseDto response = lectureMapper.toDto(lecture);
        response.setSuccess(true);
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<LectureGetLecturePageResponseDto> getLecturePage(Integer offset, Integer count, UUID sectionId) {
        List<Lecture> lectures = lectureService.getAllLecturesBySectionId(sectionId, offset, count);
        List<LectureGetLecturePageItemResponseDto> dto = lectureMapper.toResponseDtoList(lectures);

        LectureGetLecturePageResponseDto response = new LectureGetLecturePageResponseDto();
        response.setSuccess(true);
        response.data(dto);
        return ResponseEntity.ok(response);
    }
}
