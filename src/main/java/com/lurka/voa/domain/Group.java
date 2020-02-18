package com.lurka.voa.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

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

    @OneToMany(mappedBy = "group")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<UserGroup> userGroups = new HashSet<>();

    @OneToMany(mappedBy = "group")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<GroupList> groupLists = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Set<UserGroup> getUserGroups() {
        return userGroups;
    }

    public Group userGroups(Set<UserGroup> userGroups) {
        this.userGroups = userGroups;
        return this;
    }

    public Group addUserGroup(UserGroup userGroup) {
        this.userGroups.add(userGroup);
        userGroup.setGroup(this);
        return this;
    }

    public Group removeUserGroup(UserGroup userGroup) {
        this.userGroups.remove(userGroup);
        userGroup.setGroup(null);
        return this;
    }

    public void setUserGroups(Set<UserGroup> userGroups) {
        this.userGroups = userGroups;
    }

    public Set<GroupList> getGroupLists() {
        return groupLists;
    }

    public Group groupLists(Set<GroupList> groupLists) {
        this.groupLists = groupLists;
        return this;
    }

    public Group addGroupList(GroupList groupList) {
        this.groupLists.add(groupList);
        groupList.setGroup(this);
        return this;
    }

    public Group removeGroupList(GroupList groupList) {
        this.groupLists.remove(groupList);
        groupList.setGroup(null);
        return this;
    }

    public void setGroupLists(Set<GroupList> groupLists) {
        this.groupLists = groupLists;
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
            ", groupName='" + getGroupName() + "'" +
            ", groupDescription='" + getGroupDescription() + "'" +
            ", groupPhoto='" + getGroupPhoto() + "'" +
            ", groupPhotoContentType='" + getGroupPhotoContentType() + "'" +
            "}";
    }
}
