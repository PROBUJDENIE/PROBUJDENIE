package org.hse.probujdenie.mapper;

import org.hse.probujdenie.api.model.CreateExerciseRequest;
import org.hse.probujdenie.api.model.GetAllExercisesItemResponseDto;
import org.hse.probujdenie.api.model.UpdateExerciseRequest;
import org.hse.probujdenie.model.exercise.Exercise;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ExerciseMapper {

    List<GetAllExercisesItemResponseDto> toResponseDtoList(List<Exercise> exercises);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateExerciseFromDto(Exercise source, @MappingTarget Exercise target);

    @Mapping(target = "version", ignore = true)
    @Mapping(target = "creationDateTime", ignore = true)
    @Mapping(target = "lastModificationDateTime", ignore = true)
    @Mapping(target = "status", ignore = true)
    Exercise toEntity(UpdateExerciseRequest request);

    @Mapping(target = "version", ignore = true)
    @Mapping(target = "creationDateTime", ignore = true)
    @Mapping(target = "lastModificationDateTime", ignore = true)
    @Mapping(target = "status", ignore = true)
    Exercise toEntity(CreateExerciseRequest request);
}

