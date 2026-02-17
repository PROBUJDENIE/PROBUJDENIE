package org.hse.probujdenie.util;

import lombok.experimental.UtilityClass;

import java.util.UUID;

@UtilityClass
public class UuidService {

    public static UUID generateId(){
       return UUID.randomUUID();
    }
}
