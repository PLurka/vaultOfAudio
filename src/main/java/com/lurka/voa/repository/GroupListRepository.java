package com.lurka.voa.repository;

import com.lurka.voa.domain.GroupList;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the GroupList entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GroupListRepository extends JpaRepository<GroupList, Long> {

}
