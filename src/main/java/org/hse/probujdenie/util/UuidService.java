package org.hse.probujdenie.util;

import lombok.experimental.UtilityClass;

import java.util.UUID;

@UtilityClass
public class UuidService {

    public static UUID generateId(){
       //return UUID.randomUUID();
        return UUID.fromString("276e1d8b-f533-42bf-852a-3d83f1ff8e36");
    }
}
