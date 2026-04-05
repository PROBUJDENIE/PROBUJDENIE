package org.hse.probujdenie.util;

import lombok.experimental.UtilityClass;

import java.util.UUID;

@UtilityClass
public class UuidUtil {

    public static UUID generateId(){
       return UUID.randomUUID();
    }
}
