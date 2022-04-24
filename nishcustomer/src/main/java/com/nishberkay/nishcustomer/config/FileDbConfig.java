package com.nishberkay.nishcustomer.config;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;
import java.util.HashMap;

@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(transactionManagerRef = "fileTransactionManager",entityManagerFactoryRef = "fileEntityManagerFactory", basePackages = {
        "com.nishberkay.nishcustomer.repository.postgresrepository"})
public class FileDbConfig {

    @Bean(name = "fileDataSource")
    @ConfigurationProperties(prefix = "spring.file.datasource")
    public DataSource dataSource() {
        return DataSourceBuilder.create().build();
    }

    @Bean(name = "fileEntityManagerFactory")
    public LocalContainerEntityManagerFactoryBean fileEntityManagerFactory(EntityManagerFactoryBuilder builder,
                                                                       @Qualifier("fileDataSource") DataSource dataSource) {
        HashMap<String, Object> properties = new HashMap<>();
        properties.put("hibernate.hbm2ddl.auto", "update");
        return builder.dataSource(dataSource).properties(properties)
                .packages("com.nishberkay.nishcustomer.entity.postgresentity").persistenceUnit("File").build();
    }

    @Bean(name = "fileTransactionManager")
    public PlatformTransactionManager fileTransactionManager(
            @Qualifier("fileEntityManagerFactory") EntityManagerFactory entityManagerFactory) {
        return new JpaTransactionManager(entityManagerFactory);
    }

}
