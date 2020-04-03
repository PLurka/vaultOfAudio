package com.lurka.voa.repository;

import com.lurka.voa.domain.Song;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Song entity.
 */
@Repository
public interface SongRepository extends JpaRepository<Song, Long> {

    @Query(value = "select distinct song from Song song left join fetch song.users",
        countQuery = "select count(distinct song) from Song song")
    Page<Song> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct song from Song song left join fetch song.users")
    List<Song> findAllWithEagerRelationships();

    @Query("select song from Song song left join fetch song.users where song.id =:id")
    Optional<Song> findOneWithEagerRelationships(@Param("id") Long id);

}
