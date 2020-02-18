package com.lurka.voa.repository;

import com.lurka.voa.domain.ListSong;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ListSong entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ListSongRepository extends JpaRepository<ListSong, Long> {

}
