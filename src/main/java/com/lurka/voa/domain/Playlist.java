package com.lurka.voa.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A Playlist.
 */
@Entity
@Table(name = "playlist")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Playlist implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "list_id", nullable = false, unique = true)
    private Integer listId;

    @NotNull
    @Size(max = 200)
    @Column(name = "list_name", length = 200, nullable = false)
    private String listName;

    @Size(max = 2000)
    @Column(name = "list_description", length = 2000)
    private String listDescription;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getListId() {
        return listId;
    }

    public Playlist listId(Integer listId) {
        this.listId = listId;
        return this;
    }

    public void setListId(Integer listId) {
        this.listId = listId;
    }

    public String getListName() {
        return listName;
    }

    public Playlist listName(String listName) {
        this.listName = listName;
        return this;
    }

    public void setListName(String listName) {
        this.listName = listName;
    }

    public String getListDescription() {
        return listDescription;
    }

    public Playlist listDescription(String listDescription) {
        this.listDescription = listDescription;
        return this;
    }

    public void setListDescription(String listDescription) {
        this.listDescription = listDescription;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Playlist)) {
            return false;
        }
        return id != null && id.equals(((Playlist) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Playlist{" +
            "id=" + getId() +
            ", listId=" + getListId() +
            ", listName='" + getListName() + "'" +
            ", listDescription='" + getListDescription() + "'" +
            "}";
    }
}
