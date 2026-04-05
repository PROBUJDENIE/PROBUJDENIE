package org.hse.probujdenie.util;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
@AllArgsConstructor
public class ContainerExecutionResult {
    private final int exitCode;
    private final String logs;
}
