package com.lurka.voa.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Crowd.
 */
@Entity
@Table(name = "crowd")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Crowd implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(max = 200)
    @Column(name = "crowd_name", length = 200, nullable = false)
    private String crowdName;

    @Size(max = 2000)
    @Column(name = "crowd_description", length = 2000)
    private String crowdDescription;

    @Lob
    @Column(name = "crowd_photo")
    private byte[] crowdPhoto;

    @Column(name = "crowd_photo_content_type")
    private String crowdPhotoContentType;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "crowd_user",
               joinColumns = @JoinColumn(name = "crowd_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"))
    private Set<UserExtra> users = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "crowd_accepted",
               joinColumns = @JoinColumn(name = "crowd_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "accepted_id", referencedColumnName = "id"))
    private Set<UserExtra> accepteds = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "crowd_playlist",
               joinColumns = @JoinColumn(name = "crowd_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "playlist_id", referencedColumnName = "id"))
    private Set<Playlist> playlists = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("createdCrowds")
    private UserExtra createdBy;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCrowdName() {
        return crowdName;
    }

    public Crowd crowdName(String crowdName) {
        this.crowdName = crowdName;
        return this;
    }

    public void setCrowdName(String crowdName) {
        this.crowdName = crowdName;
    }

    public String getCrowdDescription() {
        return crowdDescription;
    }

    public Crowd crowdDescription(String crowdDescription) {
        this.crowdDescription = crowdDescription;
        return this;
    }

    public void setCrowdDescription(String crowdDescription) {
        this.crowdDescription = crowdDescription;
    }

    public byte[] getCrowdPhoto() {
        return crowdPhoto;
    }

    public Crowd crowdPhoto(byte[] crowdPhoto) {
        this.crowdPhoto = crowdPhoto;
        return this;
    }

    public void setCrowdPhoto(byte[] crowdPhoto) {
        this.crowdPhoto = crowdPhoto;
    }

    public String getCrowdPhotoContentType() {
        return crowdPhotoContentType;
    }

    public Crowd crowdPhotoContentType(String crowdPhotoContentType) {
        this.crowdPhotoContentType = crowdPhotoContentType;
        return this;
    }

    public void setCrowdPhotoContentType(String crowdPhotoContentType) {
        this.crowdPhotoContentType = crowdPhotoContentType;
    }

    public Set<UserExtra> getUsers() {
        return users;
    }

    public Crowd users(Set<UserExtra> userExtras) {
        this.users = userExtras;
        return this;
    }

    public Crowd addUser(UserExtra userExtra) {
        this.users.add(userExtra);
        userExtra.getCrowds().add(this);
        return this;
    }

    public Crowd removeUser(UserExtra userExtra) {
        this.users.remove(userExtra);
        userExtra.getCrowds().remove(this);
        return this;
    }

    public void setUsers(Set<UserExtra> userExtras) {
        this.users = userExtras;
    }

    public Set<UserExtra> getAccepteds() {
        return accepteds;
    }

    public Crowd accepteds(Set<UserExtra> userExtras) {
        this.accepteds = userExtras;
        return this;
    }

    public Crowd addAccepted(UserExtra userExtra) {
        this.accepteds.add(userExtra);
        userExtra.getAcceptedCrowds().add(this);
        return this;
    }

    public Crowd removeAccepted(UserExtra userExtra) {
        this.accepteds.remove(userExtra);
        userExtra.getAcceptedCrowds().remove(this);
        return this;
    }

    public void setAccepteds(Set<UserExtra> userExtras) {
        this.accepteds = userExtras;
    }

    public Set<Playlist> getPlaylists() {
        return playlists;
    }

    public Crowd playlists(Set<Playlist> playlists) {
        this.playlists = playlists;
        return this;
    }

    public Crowd addPlaylist(Playlist playlist) {
        this.playlists.add(playlist);
        playlist.getCrowds().add(this);
        return this;
    }

    public Crowd removePlaylist(Playlist playlist) {
        this.playlists.remove(playlist);
        playlist.getCrowds().remove(this);
        return this;
    }

    public void setPlaylists(Set<Playlist> playlists) {
        this.playlists = playlists;
    }

    public UserExtra getCreatedBy() {
        return createdBy;
    }

    public Crowd createdBy(UserExtra userExtra) {
        this.createdBy = userExtra;
        return this;
    }

    public void setCreatedBy(UserExtra userExtra) {
        this.createdBy = userExtra;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Crowd)) {
            return false;
        }
        return id != null && id.equals(((Crowd) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Crowd{" +
            "id=" + getId() +
            ", crowdName='" + getCrowdName() + "'" +
            ", crowdDescription='" + getCrowdDescription() + "'" +
            ", crowdPhoto='" + getCrowdPhoto() + "'" +
            ", crowdPhotoContentType='" + getCrowdPhotoContentType() + "'" +
            "}";
    }
}
