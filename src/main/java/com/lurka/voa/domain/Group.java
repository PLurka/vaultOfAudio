package com.lurka.voa.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A Group.
 */
@Entity
@Table(name = "jhi_group")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Group implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "group_id", nullable = false, unique = true)
    private Integer groupId;

    @NotNull
    @Size(max = 200)
    @Column(name = "group_name", length = 200, nullable = false)
    private String groupName;

    @Size(max = 2000)
    @Column(name = "group_description", length = 2000)
    private String groupDescription;

    @Lob
    @Column(name = "group_photo")
    private byte[] groupPhoto;

    @Column(name = "group_photo_content_type")
    private String groupPhotoContentType;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getGroupId() {
        return groupId;
    }

    public Group groupId(Integer groupId) {
        this.groupId = groupId;
        return this;
    }

    public void setGroupId(Integer groupId) {
        this.groupId = groupId;
    }

    public String getGroupName() {
        return groupName;
    }

    public Group groupName(String groupName) {
        this.groupName = groupName;
        return this;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }

    public String getGroupDescription() {
        return groupDescription;
    }

    public Group groupDescription(String groupDescription) {
        this.groupDescription = groupDescription;
        return this;
    }

    public void setGroupDescription(String groupDescription) {
        this.groupDescription = groupDescription;
    }

    public byte[] getGroupPhoto() {
        return groupPhoto;
    }

    public Group groupPhoto(byte[] groupPhoto) {
        this.groupPhoto = groupPhoto;
        return this;
    }

    public void setGroupPhoto(byte[] groupPhoto) {
        this.groupPhoto = groupPhoto;
    }

    public String getGroupPhotoContentType() {
        return groupPhotoContentType;
    }

    public Group groupPhotoContentType(String groupPhotoContentType) {
        this.groupPhotoContentType = groupPhotoContentType;
        return this;
    }

    public void setGroupPhotoContentType(String groupPhotoContentType) {
        this.groupPhotoContentType = groupPhotoContentType;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Group)) {
            return false;
        }
        return id != null && id.equals(((Group) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Group{" +
            "id=" + getId() +
            ", groupId=" + getGroupId() +
            ", groupName='" + getGroupName() + "'" +
            ", groupDescription='" + getGroupDescription() + "'" +
            ", groupPhoto='" + getGroupPhoto() + "'" +
            ", groupPhotoContentType='" + getGroupPhotoContentType() + "'" +
            "}";
    }
}
