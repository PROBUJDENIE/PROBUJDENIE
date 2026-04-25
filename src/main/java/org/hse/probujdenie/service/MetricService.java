package org.hse.probujdenie.service;

import io.micrometer.core.instrument.MeterRegistry;
import io.micrometer.core.instrument.Tag;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@AllArgsConstructor
public class MetricService {

    private final MeterRegistry meterRegistry;

    public void increment(String metricName) {
        meterRegistry.counter(metricName).increment();
    }

    public void increment(String metricName, Map<String, String> result) {
        List<Tag> tags = result.entrySet().stream()
                .map(entry -> Tag.of(entry.getKey(), entry.getValue()))
                .toList();
        meterRegistry.counter(metricName, tags);
    }
}
