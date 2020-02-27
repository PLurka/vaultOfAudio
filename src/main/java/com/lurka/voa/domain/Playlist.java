package com.lurka.voa.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Playlist.
 */
@Entity
@Table(name = "list")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Playlist implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(max = 200)
    @Column(name = "list_name", length = 200, nullable = false)
    private String listName;

    @Size(max = 2000)
    @Column(name = "list_description", length = 2000)
    private String listDescription;

    @OneToMany(mappedBy = "playlist")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<UserList> userLists = new HashSet<>();

    @OneToMany(mappedBy = "playlist")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<GroupList> groupLists = new HashSet<>();

    @OneToMany(mappedBy = "playlist")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ListSong> listSongs = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Set<UserList> getUserLists() {
        return userLists;
    }

    public Playlist userLists(Set<UserList> userLists) {
        this.userLists = userLists;
        return this;
    }

    public Playlist addUserList(UserList userList) {
        this.userLists.add(userList);
        userList.setPlaylist(this);
        return this;
    }

    public Playlist removeUserList(UserList userList) {
        this.userLists.remove(userList);
        userList.setPlaylist(null);
        return this;
    }

    public void setUserLists(Set<UserList> userLists) {
        this.userLists = userLists;
    }

    public Set<GroupList> getGroupLists() {
        return groupLists;
    }

    public Playlist groupLists(Set<GroupList> groupLists) {
        this.groupLists = groupLists;
        return this;
    }

    public Playlist addGroupList(GroupList groupList) {
        this.groupLists.add(groupList);
        groupList.setPlaylist(this);
        return this;
    }

    public Playlist removeGroupList(GroupList groupList) {
        this.groupLists.remove(groupList);
        groupList.setPlaylist(null);
        return this;
    }

    public void setGroupLists(Set<GroupList> groupLists) {
        this.groupLists = groupLists;
    }

    public Set<ListSong> getListSongs() {
        return listSongs;
    }

    public Playlist listSongs(Set<ListSong> listSongs) {
        this.listSongs = listSongs;
        return this;
    }

    public Playlist addListSong(ListSong listSong) {
        this.listSongs.add(listSong);
        listSong.setPlaylist(this);
        return this;
    }

    public Playlist removeListSong(ListSong listSong) {
        this.listSongs.remove(listSong);
        listSong.setPlaylist(null);
        return this;
    }

    public void setListSongs(Set<ListSong> listSongs) {
        this.listSongs = listSongs;
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
            ", listName='" + getListName() + "'" +
            ", listDescription='" + getListDescription() + "'" +
            "}";
    }
}
