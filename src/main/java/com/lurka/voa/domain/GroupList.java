package com.lurka.voa.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A GroupList.
 */
@Entity
@Table(name = "group_list")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class GroupList implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JsonIgnoreProperties("groupLists")
    private Group groupId;

    @ManyToOne
    @JsonIgnoreProperties("groupLists")
    private Playlist listId;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Group getGroupId() {
        return groupId;
    }

    public GroupList groupId(Group group) {
        this.groupId = group;
        return this;
    }

    public void setGroupId(Group group) {
        this.groupId = group;
    }

    public Playlist getListId() {
        return listId;
    }

    public GroupList listId(Playlist playlist) {
        this.listId = playlist;
        return this;
    }

    public void setListId(Playlist playlist) {
        this.listId = playlist;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof GroupList)) {
            return false;
        }
        return id != null && id.equals(((GroupList) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "GroupList{" +
            "id=" + getId() +
            "}";
    }
}
