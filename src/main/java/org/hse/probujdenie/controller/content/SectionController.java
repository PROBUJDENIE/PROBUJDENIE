package org.hse.probujdenie.controller.content;

import lombok.RequiredArgsConstructor;
import org.hse.probujdenie.api.SectionApiDelegate;
import org.hse.probujdenie.api.model.*;
import org.hse.probujdenie.mapper.SectionMapper;
import org.hse.probujdenie.model.content.Section;
import org.hse.probujdenie.service.content.SectionService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.UUID;


@Controller
@RequiredArgsConstructor
public class SectionController implements SectionApiDelegate {

    private final SectionService sectionService;
    private final SectionMapper sectionMapper;

    @Override
    public ResponseEntity<BaseResponseDto> createSection(SectionCreateRequestDto sectionCreateRequestDto) {
        Section section = sectionMapper.toEntity(sectionCreateRequestDto);
        sectionService.createSection(sectionCreateRequestDto.getCourseId(), section);
        return ResponseEntity.ok(new BaseResponseDto(true));
    }

    @Override
    public ResponseEntity<BaseResponseDto> updateSection(SectionUpdateRequestDto sectionUpdateRequestDto) {
        Section section = sectionMapper.toEntity(sectionUpdateRequestDto);
        sectionService.updateSection(section);
        return ResponseEntity.ok(new BaseResponseDto(true));
    }

    @Override
    public ResponseEntity<BaseResponseDto> deleteSection(SectionDeleteRequestDto sectionDeleteRequestDto) {
        sectionService.deleteSection(sectionDeleteRequestDto.getSectionId());
        return ResponseEntity.ok(new BaseResponseDto(true));
    }

    @Override
    public ResponseEntity<SectionGetSectionPageResponseDto> getSectionPage(Integer offset, Integer count, UUID courseId) {
        List<Section> sections = sectionService.getSectionPage(courseId, offset, count);
        List<SectionGetSectionPageItemResponseDto> dto = sectionMapper.toResponseDtoList(sections);

        SectionGetSectionPageResponseDto response = new SectionGetSectionPageResponseDto();
        response.setSuccess(true);
        response.setData(dto);

        return ResponseEntity.ok(response);
    }
}