package org.hse.probujdenie.mapper;

import org.hse.probujdenie.api.model.*;
import org.hse.probujdenie.model.exercise.Exercise;
import org.hse.probujdenie.model.exercise.StudentSubmission;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface StudentSubmissionMapper {


    @Mapping(target = "creationDateTime", ignore = true)
    StudentSubmission toEntityFromCreateStudentSubmissionDto(CreateStudentSubmissionRequestDto request);

    @Mapping(target = "exerciseId", source = "exercise.id")
    @Mapping(target = "studentEmail", source = "student.email")
    CreateStudentSubmissionResponseDtoItem toCreateStudentSubmissionDtoFromEntity(StudentSubmission request);

    @Mapping(target = "exerciseId", source = "exercise.id")
    @Mapping(target = "studentEmail", source = "student.email")
    GetStudentSubmissionResponseDtoItem toGetStudentSubmissionResponseDtoItem(StudentSubmission request);


}
