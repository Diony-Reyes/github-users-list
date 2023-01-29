import React from "react";
import styles from "../styles/User.module.scss";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import { Paper, Chip, Avatar, Modal, Backdrop, Fade } from "@material-ui/core";

import { useParams } from "react-router-dom";
import { baseUrl, getAUser, path } from "../request";

export default function User() {
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = React.useState<UserDetail>();
  const [repos, setRepos] = React.useState<Repo[]>([]);
  const [repo, setRepo] = React.useState<Repo>();
  const [followers, setFollowers] = React.useState<User[]>([]);
  const [following, setFollowing] = React.useState<User[]>([]);

  const { id } = useParams();

  const handleOpen = (repo: Repo) => {
    setOpen(true);
    setRepo(repo);
  };

  const handleClose = () => {
    setOpen(false);
    setRepo(undefined);
  };

  const getColor = (id: number) => {
    if (id % 2 === 0) {
      return "primary";
    }

    if (id % 3 === 0) {
      return "secondary";
    }

    return "default";
  };

  const getNumber = (number: number) => {
    if (number > 99) {
      return "99+";
    }

    return number;
  };

  const getRepos = async (url: string) => {
    const response = await fetch(url);
    const data = await response.json();

    if (data?.length > 0) {
      setRepos(data);
    }
  };

  const getFollowers = async (url: string) => {
    const response = await fetch(url);
    const data = await response.json();

    if (data?.length > 0) {
      setFollowers(data);
    }
  };

  const getFollowing = async (user: string) => {
    const response = await fetch(
      `${baseUrl}${path.users}/${user}${path.following}`
    );
    const data = await response.json();

    if (data?.length > 0) {
      setFollowing(data);
    }
  };

  React.useEffect(() => {
    let avoid = false;

    const getUser = async (id: string) => {
      const response = await getAUser(id);

      if (!avoid && response?.id) {
        setUser(response);
        getRepos(response?.repos_url);
        getFollowers(response?.followers_url);
        getFollowing(response?.login);
      }
    };

    if (id) {
      getUser(id);
    }

    return () => {
      avoid = true;
    };
  }, [id]);

  return (
    <Paper className={styles.container}>
      <div>
        <h3 className={styles.title}>Datos Generales</h3>
        <hr className={styles.divider} />
      </div>

      <div className={styles.section + " row"}>
        <div className="col-12 col-sm-6">
          <h5 className={styles.title}>Nombre</h5>
          <h5 className={styles.text}>{user?.login}</h5>
        </div>

        <div className="col-12 col-sm-6">
          <h5 className={styles.title}>Email</h5>
          <h5 className={styles.text}>{user?.email}</h5>
        </div>
      </div>

      <div className={styles.section + " row"}>
        <div className="col-12 col-sm-6">
          <h5 className={styles.title}>Nombre Real</h5>
          <h5 className={styles.text}>{user?.name}</h5>
        </div>

        <div className="col-12 col-sm-6">
          <h5 className={styles.title}>URL</h5>

          <h5 className={styles.text}>
            <a href={user?.html_url} target="_blank" rel="noreferrer">
              {user?.html_url}
            </a>
          </h5>
        </div>
      </div>

      <div className={styles.section + " row"}>
        <div className="col-12">
          <h5 className={styles.title}>Biografía</h5>
          <h5 className={styles.text}>{user?.bio || "No hay bio"}</h5>
        </div>
      </div>

      <div className={styles.section + " row"}>
        <div className="col-12">
          <h4 className={styles.title}>
            Repositorios
            <Chip
              className="border-0 "
              color="primary"
              variant="outlined"
              avatar={<Avatar>{getNumber(user?.public_repos || 0)}</Avatar>}
              size="medium"
            />
          </h4>

          <div className={styles.section + " row"}>
            <div className="col-12">
              {repos.map((repo) => (
                <Chip
                  className="mx-2 mb-2"
                  key={repo.id}
                  clickable
                  color={getColor(repo.id)}
                  label={repo.name}
                  size="medium"
                  onClick={() => handleOpen(repo)}
                />
              ))}
            </div>
          </div>

          <div className={styles.section + " row"}>
            <div className="col-12 mb-3 mb-sm-0 col-sm-4">
              <Chip
                color="secondary"
                variant="outlined"
                avatar={<Avatar>{getNumber(user?.followers || 0)}</Avatar>}
                label="Followers"
                size="medium"
              />

              <AvatarGroup max={5} className={`${styles["avatar-group"]} mt-3`}>
                {followers?.map((follower) => (
                  <a
                    href={follower.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-none"
                  >
                    <Avatar
                      key={follower.id}
                      alt={follower.login}
                      title={follower.login}
                      src={follower.avatar_url}
                    />
                  </a>
                ))}
              </AvatarGroup>
            </div>

            <div className="col-12 col-sm-4">
              <Chip
                variant="outlined"
                avatar={<Avatar>{getNumber(user?.following || 0)}</Avatar>}
                label="Following"
                size="medium"
              />

              <AvatarGroup max={5} className={`${styles["avatar-group"]} mt-3`}>
                {following?.map((following) => (
                  <a
                    href={following.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-none"
                  >
                    <Avatar
                      key={following.id}
                      alt={following.login}
                      title={following.login}
                      src={following.avatar_url}
                    />
                  </a>
                ))}
              </AvatarGroup>
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={open}
        className={styles.modal}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={styles["modal-content"]}>
            <div className={styles.section + " row"}>
              <div className="col-12 col-md-6">
                <h5 className={styles.title}>Nombre</h5>

                <h5 className={styles.text}>
                  <a href={repo?.html_url} target="_blank" rel="noreferrer">
                    {repo?.name}
                  </a>
                </h5>
              </div>

              <div className="col-12 col-md-6">
                <h5 className={styles.title}>Lenguaje</h5>
                <h5 className={styles.text}>{repo?.language}</h5>
              </div>
            </div>

            <div className={styles.section + " row"}>
              <div className="col-12">
                <h5 className={styles.title}>Descripción</h5>

                <h5 className={styles.text}>
                  {repo?.description || "No hay descripción"}
                </h5>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </Paper>
  );
}
