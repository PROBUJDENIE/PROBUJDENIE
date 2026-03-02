package org.hse.probujdenie.config;

import jakarta.servlet.http.HttpServletRequest;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.lang.reflect.Method;

@Aspect
@Component
public class ControllerLogAspect {
    private static final Logger log = LoggerFactory.getLogger(ControllerLogAspect.class);

    @Pointcut("execution(public * org.hse.probujdenie.controller..*(..)) || " +
            "execution(public * org.hse.probujdenie.config.GlobalExceptionHandler..*(..))")
    public void anyControllerOrHandler() {}



    @Before("anyControllerOrHandler()")
    public void before(JoinPoint jp) {
        var req = currentRequest();

        String httpMethod = req != null ? req.getMethod() : "NO_HTTP";
        String uri = req != null ? req.getRequestURI() : "NO_URI";
        String query = (req != null && req.getQueryString() != null) ? req.getQueryString() : "";

        if (query.isEmpty()) {
            log.info("[{}] IN {}", httpMethod, uri);
        } else {
            log.info("[{}] IN  {}?{}", httpMethod, uri, query);
        }
    }

    @AfterReturning(pointcut = "anyControllerOrHandler()", returning = "ret")
    public void afterReturning(JoinPoint jp, Object ret) {
        String controllerMethod =
                jp.getSignature().getDeclaringType().getSimpleName() + "." + jp.getSignature().getName();

        Object body = unwrapResponseEntity(ret);

        Boolean successed = extractSuccessed(body);
        Object errors = extractErrors(body);

        log.info("[{}] OUT successed={} errors={}", controllerMethod, successed, errors);
    }


    // ---------------- helpers ----------------

    private HttpServletRequest currentRequest() {
        var attrs = RequestContextHolder.getRequestAttributes();
        if (attrs instanceof ServletRequestAttributes sra) {
            return sra.getRequest();
        }
        return null;
    }

    private Object unwrapResponseEntity(Object ret) {
        if (ret instanceof ResponseEntity<?> re) {
            return re.getBody();
        }
        return ret;
    }


    private Boolean extractSuccessed(Object body) {
        if (body == null) {
            return null;
        }

        try {
            Method m = body.getClass().getMethod("getSuccess");
            return (Boolean) m.invoke(body);
        } catch (Exception e) {
            return null;
        }
    }

    private Object extractErrors(Object body) {
        if (body == null) {
            return null;
        }

        try {
            Method m = body.getClass().getMethod("getErrors");
            return m.invoke(body);
        } catch (Exception e) {
            return null;
        }
    }
}
