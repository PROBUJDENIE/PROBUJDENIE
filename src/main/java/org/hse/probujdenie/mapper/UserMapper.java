package org.hse.probujdenie.mapper;

import org.hse.probujdenie.api.model.*;
import org.hse.probujdenie.model.content.Course;
import org.hse.probujdenie.model.user.User;
import org.hse.probujdenie.model.user.UserData;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(target = "version", ignore = true)
    @Mapping(target = "creationDateTime", ignore = true)
    @Mapping(target = "lastModificationDateTime", ignore = true)
    User toEntityFromDto(LoginRequestDto request);

    @Mapping(target = "version", ignore = true)
    @Mapping(target = "creationDateTime", ignore = true)
    @Mapping(target = "lastModificationDateTime", ignore = true)
    User toEntityFromDto(RegisterRequestDto request);

    @Mapping(target = "version", ignore = true)
    @Mapping(target = "creationDateTime", ignore = true)
    @Mapping(target = "lastModificationDateTime", ignore = true)
    UserData toUserDataFromDto(RegisterRequestDto request);
}
