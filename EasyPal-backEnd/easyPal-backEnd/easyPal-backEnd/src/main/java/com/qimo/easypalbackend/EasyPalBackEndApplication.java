package com.qimo.easypalbackend;

import com.qimo.easypalbackend.config.JwtProperties;
import com.qimo.easypalbackend.config.SmsProperties;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@MapperScan("com.qimo.easypalbackend.mapper")
@EnableConfigurationProperties({JwtProperties.class, SmsProperties.class})
public class EasyPalBackEndApplication {

    // Spring Boot 入口：启动内嵌 Tomcat、扫描 Bean、注册 MyBatis Mapper
    public static void main(String[] args) {
        SpringApplication.run(EasyPalBackEndApplication.class, args);
    }

}
