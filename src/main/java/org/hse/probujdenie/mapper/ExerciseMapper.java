package org.hse.probujdenie.mapper;

import org.hse.probujdenie.api.model.*;
import org.hse.probujdenie.model.content.Course;
import org.hse.probujdenie.model.exercise.Exercise;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ExerciseMapper {


    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateExerciseFromDto(Exercise source, @MappingTarget Exercise target);

    @Mapping(target = "version", ignore = true)
    @Mapping(target = "creationDateTime", ignore = true)
    @Mapping(target = "lastModificationDateTime", ignore = true)
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "id", ignore = true)
    Exercise toEntityFromCreateExerciseDto(CreateExerciseRequestDto request);

    @Mapping(target = "version", ignore = true)
    @Mapping(target = "creationDateTime", ignore = true)
    @Mapping(target = "lastModificationDateTime", ignore = true)
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "id", ignore = true)
    Exercise toEntityFromCreateExerciseDto(CreateExerciseRequestDtoAdmin request);

    CreateExerciseResponseDtoItem toCreateExerciseDtoFromEntity(Exercise request);

    @Mapping(target = "version", ignore = true)
    @Mapping(target = "creationDateTime", ignore = true)
    @Mapping(target = "lastModificationDateTime", ignore = true)
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "id", ignore = true)
    Exercise toEntityFromUpdateExerciseDto(UpdateExerciseRequestDto request);

    @Mapping(target = "version", ignore = true)
    @Mapping(target = "creationDateTime", ignore = true)
    @Mapping(target = "lastModificationDateTime", ignore = true)
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "id", ignore = true)
    Exercise toEntityFromUpdateExerciseDto(UpdateExerciseRequestDtoAdmin request);

    @Mapping(target = "success", ignore = true)
    @Mapping(target = "errors", ignore = true)
    UpdateExerciseResponseDto toUpdateExerciseDtoFromEntity(Exercise request);

    @Mapping(target = "success", ignore = true)
    @Mapping(target = "errors", ignore = true)
    UpdateExerciseResponseDtoAdmin toUpdateExerciseDtoFromEntityAdmin(Exercise request);

    GetExercisesResponseDtoItem toDto(Exercise exercise);

    GetExerciseResponseDtoItem toGetExerciseDto(Exercise exercise);

    List<GetExercisesResponseDtoItem> toGetExercisesResponseDtoList(List<Exercise> exercises);
}
