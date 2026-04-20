package org.hse.probujdenie.config;

import io.micrometer.core.instrument.Counter;
import io.micrometer.core.instrument.MeterRegistry;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MetricsConfig {

    @Bean
    public Counter registrationSuccessCounter(MeterRegistry meterRegistry) {
        return Counter.builder("user.registration.count")
                .register(meterRegistry);
    }

    @Bean
    public Counter loginSuccessCounter(MeterRegistry meterRegistry) {
        return Counter.builder("user.login.count")
                .register(meterRegistry);
    }

    @Bean
    public Counter createImageFailedCounter(MeterRegistry meterRegistry) {
        return Counter.builder("create.image.count")
                .tag("result", "false")
                .register(meterRegistry);
    }

    @Bean
    public Counter startContainerFailedCounter(MeterRegistry meterRegistry) {
        return Counter.builder("start.container.count")
                .tag("result", "false")
                .register(meterRegistry);
    }

    @Bean
    public Counter startContainerSuccessCounter(MeterRegistry meterRegistry) {
        return Counter.builder("start.container.count")
                .tag("result", "true")
                .register(meterRegistry);
    }

}
