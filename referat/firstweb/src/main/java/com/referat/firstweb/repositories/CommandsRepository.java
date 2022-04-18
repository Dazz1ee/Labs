package com.referat.firstweb.repositories;

import com.referat.firstweb.entities.Command;
import org.springframework.asm.Type;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommandsRepository extends JpaRepository<Command, Long> {
    @Query("select a from Command a where a.title like %:paramet%")
    List<Command> findAllByTitleContaining(@Param("paramet") String title);
}
