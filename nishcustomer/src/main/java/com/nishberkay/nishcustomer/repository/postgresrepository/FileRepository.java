package com.nishberkay.nishcustomer.repository.postgresrepository;

import com.nishberkay.nishcustomer.entity.postgresentity.File;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FileRepository extends JpaRepository<File, Integer> {

    List<File> getAllByUserId(int userId);

    List<File> getFilesByName(String name);

}
