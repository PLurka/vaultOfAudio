package com.lurka.voa.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A UserGroup.
 */
@Entity
@Table(name = "user_group")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class UserGroup implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "created_by")
    private Boolean createdBy;

    @Column(name = "group_accepted")
    private Boolean groupAccepted;

    @Column(name = "user_accepted")
    private Boolean userAccepted;

    @ManyToOne
    @JsonIgnoreProperties("userGroups")
    private Group group;

    @ManyToOne
    @JsonIgnoreProperties("userGroups")
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean isCreatedBy() {
        return createdBy;
    }

    public UserGroup createdBy(Boolean createdBy) {
        this.createdBy = createdBy;
        return this;
    }

    public void setCreatedBy(Boolean createdBy) {
        this.createdBy = createdBy;
    }

    public Boolean isGroupAccepted() {
        return groupAccepted;
    }

    public UserGroup groupAccepted(Boolean groupAccepted) {
        this.groupAccepted = groupAccepted;
        return this;
    }

    public void setGroupAccepted(Boolean groupAccepted) {
        this.groupAccepted = groupAccepted;
    }

    public Boolean isUserAccepted() {
        return userAccepted;
    }

    public UserGroup userAccepted(Boolean userAccepted) {
        this.userAccepted = userAccepted;
        return this;
    }

    public void setUserAccepted(Boolean userAccepted) {
        this.userAccepted = userAccepted;
    }

    public Group getGroup() {
        return group;
    }

    public UserGroup group(Group group) {
        this.group = group;
        return this;
    }

    public void setGroup(Group group) {
        this.group = group;
    }

    public User getUser() {
        return user;
    }

    public UserGroup user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof UserGroup)) {
            return false;
        }
        return id != null && id.equals(((UserGroup) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "UserGroup{" +
            "id=" + getId() +
            ", createdBy='" + isCreatedBy() + "'" +
            ", groupAccepted='" + isGroupAccepted() + "'" +
            ", userAccepted='" + isUserAccepted() + "'" +
            "}";
    }
}
