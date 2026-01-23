package org.hse.probujdenie.controller.content;

import lombok.RequiredArgsConstructor;
import org.hse.probujdenie.api.LectureApiDelegate;
import org.hse.probujdenie.api.model.*;
import org.hse.probujdenie.mapper.LectureMapper;
import org.hse.probujdenie.model.content.Lecture;
import org.hse.probujdenie.service.content.LectureService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;

import java.util.List;

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
    public ResponseEntity<LectureGetLectureResponseDto> getLecture(LectureGetLectureRequestDto lectureGetLectureRequestDto) {
        Lecture lecture = lectureService.getLecture(lectureGetLectureRequestDto.getLectureId());

        LectureGetLectureResponseDto response = new LectureGetLectureResponseDto();
        response.setSuccess(true);
        response.data(lectureMapper.toDto(lecture));
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<LectureGetLecturePageResponseDto> getLecturePage(Integer offset, Integer count, LectureGetLecturePageRequestDto lectureGetLecturePageRequestDto) {
        List<Lecture> lectures = lectureService.getAllLecturesBySectionId(lectureGetLecturePageRequestDto.getSectionId(), offset, count);
        List<LectureGetLecturePageItemResponseDto> dto = lectureMapper.toResponseDtoList(lectures);

        LectureGetLecturePageResponseDto response = new LectureGetLecturePageResponseDto();
        response.setSuccess(true);
        response.data(dto);
        return ResponseEntity.ok(response);
    }
}
