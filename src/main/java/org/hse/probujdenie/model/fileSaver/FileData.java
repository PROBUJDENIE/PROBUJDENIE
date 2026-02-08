package org.hse.probujdenie.model.fileSaver;


import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;

@Data
@Getter
@Setter
@Builder
public class FileData {

    private HttpHeaders httpHeaders;
    private InputStreamResource inputStreamResource;
}