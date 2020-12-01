import { formatRelative, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/esm/locale';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import {
  FiAlertCircle,
  FiHeart,
  FiMail,
  FiMessageCircle,
  FiTrash,
  FiX,
} from 'react-icons/fi';
import ComponentHeader from '../../components/ComponentHeader';
import { UserContext } from '../../context/AuthContext';
import { ToastContext } from '../../context/ToastContext';

import api from '../../services/api';

import { Container } from './styles';
import camera from '../../assets/camera.svg';
import useAxios from '../../hooks/useAxios';

function Post() {
  const [postModal, setPostModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedComment, setSelectedComment] = useState(null);
  const [commentContent, setCommentContent] = useState('');
  const [peoplesAtComments, setPeoplesAtComments] = useState([]);
  const [peopleModal, setPeopleModal] = useState(false);
  const [selectedPeople, setSelectedPeople] = useState(null);
  const [createModal, setCreateModal] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);

  const { showToast } = useContext(ToastContext);
  const { token, user } = useContext(UserContext);

  const { data, error, mutate } = useAxios('/company/post');

  const peopleInputRef = useRef(null);
  const titleInputRef = useRef(null);

  const preview = useMemo(
    () => (thumbnail ? URL.createObjectURL(thumbnail) : null),
    [thumbnail]
  );

  function onOpenFocusModal(post) {
    setSelectedPost(post);

    setPostModal(true);
  }

  function onOpenDeleteModal(post) {
    setSelectedPost(post);

    setDeleteModal(true);
  }

  function closeModal() {
    setSelectedPost(null);
    setSelectedComment(null);
    setSelectedPeople(null);
    setCommentContent('');
    setThumbnail(null);

    if (postModal) setPostModal(false);
    if (deleteModal) setDeleteModal(false);
    if (createModal) setCreateModal(false);
  }

  function handleDigit(e) {
    const value = e.target.value;

    if (peopleModal) {
      setPeopleModal(false);
    }
    if (value === '@') {
      const peoplesComments = selectedPost.comments.reduce((acc, curr) => {
        if (
          !acc.length &&
          user.id !== curr.employee?.id &&
          user.id !== curr.customer?.id
        ) {
          acc.push(curr);
        } else if (
          user.id !== curr.employee?.id &&
          user.id !== curr.customer?.id
        ) {
          return acc;
        } else {
          let lastPushedArray = acc[acc.length - 1];
          if (
            lastPushedArray?.customer &&
            lastPushedArray.customer?.id === curr.customer?.id
          ) {
            return acc;
          } else if (
            lastPushedArray?.employee &&
            lastPushedArray.employee?.id === curr.employee?.id
          ) {
            return acc;
          } else if (
            user.id !== curr.employee?.id &&
            user.id !== curr.customer?.id
          ) {
            acc.push(curr);
          }
        }
        return acc;
      }, []);

      const peoplesCommentsFiltered = peoplesComments.map((comment) =>
        comment.employee
          ? {
              id: comment.employee.id,
              name: comment.employee.name,
              url: comment.employee.avatar.url,
            }
          : {
              id: comment.customer.id,
              name: comment.customer.name,
              url: comment.customer.avatar.url,
            }
      );

      openPeopleModal(peoplesCommentsFiltered);
    } else if (value.indexOf('@') === -1) {
      setPeopleModal(false);
    }
  }

  async function handleDeletePost() {
    if (selectedPost) {
      api({
        method: 'delete',
        url: `/company/post/${selectedPost.id}`,
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      const postsUpdated = data.filter((post) => post.id !== selectedPost.id);
      mutate(postsUpdated, false);
      closeModal();
      showToast(
        'Publicação deletada com sucesso!',
        <FiAlertCircle color="#78cf9d" size={35} />
      );
    }
  }

  function handleSelectPeople(people) {
    setCommentContent(`@${people.name} `);
    peopleInputRef.current.focus();
    setPeopleModal(false);
    setSelectedPeople(people.id);
  }

  function openPeopleModal(value) {
    setPeoplesAtComments(value);
    setPeopleModal(true);
  }

  function handleAnswer(post) {
    setCommentContent(`@${post.employee?.name || post.customer?.name} `);
    setSelectedPeople(post.employee?.id || post.customer?.id);
    peopleInputRef.current.focus();
  }

  async function handleComment() {
    if (!/^@[A-z]*((\s[A-z]*)*)?/.test(commentContent)) {
      setSelectedPeople(null);
    }

    if (!commentContent) {
      showToast('Digite algo...');
      return;
    }

    try {
      const response = await api({
        method: 'post',
        url: !selectedPeople
          ? `/posts/comment?p=${selectedPost.id}&context=employee`
          : `/posts/comment?p=${selectedPost.id}&notifyTo=${selectedPeople}&context=employee`,
        data: { content: commentContent },
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      const _selectedPost = selectedPost;
      _selectedPost.comments = [..._selectedPost.comments, response.data];

      setSelectedPost(_selectedPost);
      setPosts((state) =>
        state.map((post) => (post.id === selectedPost.id ? selectedPost : post))
      );
      setCommentContent('');
      setSelectedPeople(null);
    } catch (error) {
      showToast(error.response.data.error);
    }
  }

  async function handleCreatePost() {
    const title = titleInputRef.current?.value;

    if (!title) {
      showToast('Digite um texto para criar a publicação');
      return;
    }

    if (!thumbnail) {
      showToast('Selecione uma imagem');
      return;
    }

    try {
      const dataForm = new FormData();
      dataForm.append('midia', thumbnail);
      dataForm.append('title', title);
      const response = await api({
        method: 'post',
        url: '/company/post',
        data: dataForm,
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      mutate([response.data, ...data], false);
      closeModal();
      showToast(
        'Publicação criada com sucesso!',
        <FiAlertCircle color="#78cf9d" size={35} />
      );
    } catch (error) {
      showToast(error.response.data.error);
    }
  }

  async function handleDeleteComment(comment) {
    api({
      method: 'delete',
      url: `/posts/comment/${comment.id}?context=employee`,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    const _selectedPost = selectedPost;
    _selectedPost.comments = selectedPost.comments.filter(
      (cmt) => cmt.id !== comment.id
    );
    setSelectedPost(_selectedPost);
    const updatedPost = data.map((post) =>
      post.id === selectedPost.id ? selectedPost : post
    );
    mutate(updatedPost, false);
  }

  return (
    <Container>
      <ComponentHeader
        title="Publicações"
        icon={<FiMail size={25} color="#fff" />}
        style={{ padding: '0 40px' }}
      />
      <div className="content">
        <button onClick={() => setCreateModal(true)}>Publicar novo</button>
        <ul className="posts">
          {data?.map((post) => (
            <li key={post.id}>
              <header>
                <FiTrash
                  size={18}
                  color="#f25c5c"
                  onClick={() => onOpenDeleteModal(post)}
                />
                <img
                  src={post.employee.avatar.url}
                  alt="profile"
                  className="profile"
                />
                <div className="column">
                  <h3>{post.employee.name}</h3>
                  <span>
                    Equipe Petscão -{' '}
                    {formatRelative(parseISO(post.createdAt), new Date(), {
                      locale: ptBR,
                    })}
                  </span>
                </div>
              </header>
              <img src={post.midia.url} alt="midia" />
              <footer>
                <div className="reactions">
                  <FiHeart size={16} color="#f25c5c" />
                  <span>{post.likes.length}</span>
                  <FiMessageCircle size={16} color="#4287f5" />
                  <span>{post.comments.length}</span>
                </div>
                <span title={post.title}>
                  <strong>{post.employee.name}: </strong>
                  {post.title}
                </span>
                <p onClick={() => onOpenFocusModal(post)}>
                  Ver mais sobre esta publicação
                </p>
              </footer>
            </li>
          ))}
        </ul>
      </div>
      {createModal && (
        <div className="create-modal">
          <div className="modal w-500">
            <label htmlFor="title">Texto da publicação</label>
            <input type="text" name="title" id="title" ref={titleInputRef} />

            <label htmlFor="">Selecione a imagem</label>
            <label
              id="thumbnail"
              style={{
                backgroundImage: `url(${preview})`,
                backgroundPosition: 'center',
                objectFit: 'cover',
                width: '100%',
                height: '100%',
              }}
              className={thumbnail ? 'has-thumbnail' : ''}
            >
              <input
                type="file"
                accept="image/*"
                onChange={(event) => setThumbnail(event.target.files[0])}
              />
              <img src={camera} alt="Select img" />
              <h3>Selecione a mídia da publicação</h3>
            </label>
            <div className="row">
              <button className="yes" onClick={handleCreatePost}>
                Publicar
              </button>
              <button className="blue" onClick={closeModal}>
                Voltar
              </button>
            </div>
          </div>
        </div>
      )}
      {deleteModal && (
        <div className="delete-modal">
          <div className="modal-window">
            <h3>Tem certeza?</h3>
            <div className="options" style={{ display: 'flex' }}>
              <button className="yes" onClick={handleDeletePost}>
                Sim
              </button>
              <button className="no" onClick={closeModal}>
                Não
              </button>
            </div>
          </div>
        </div>
      )}

      {postModal && (
        <div className="post-modal">
          <div className="modal">
            <button onClick={closeModal}>
              <FiX size={16} color="#fff" />
            </button>
            <header>
              <img
                src={selectedPost.employee.avatar.url}
                alt="profile"
                className="profile"
              />
              <div className="column">
                <h3>{selectedPost.employee.name}</h3>
                <span>
                  Equipe Petscão -{' '}
                  {formatRelative(
                    parseISO(selectedPost.createdAt),
                    new Date(),
                    {
                      locale: ptBR,
                    }
                  )}
                </span>
              </div>
            </header>
            <img src={selectedPost.midia.url} alt="midia" />
            <footer>
              <div className="reactions">
                <FiHeart size={16} color="#f25c5c" />
                <span>{selectedPost.likes.length}</span>
                <FiMessageCircle size={16} color="#4287f5" />
                <span>{selectedPost.comments.length}</span>
              </div>
              <span title="text here">
                <strong>{selectedPost.employee.name}: </strong>
                {selectedPost.title}
              </span>
            </footer>
            <ul className="comments">
              {selectedPost.comments.map((comment) => (
                <li className="comment" key={comment.id}>
                  {comment.employee?.id === user.id && (
                    <FiTrash
                      size={18}
                      color="#f25c5c"
                      onClick={() => handleDeleteComment(comment)}
                    />
                  )}

                  <img
                    src={
                      comment.employee?.avatar.url ||
                      comment.customer?.avatar.url
                    }
                    alt="profile"
                    className="profile"
                  />
                  <div className="text">
                    <h3>{comment.employee?.name || comment.customer?.name}</h3>
                    <span>{comment.content}</span>
                    <div className="reply">
                      <span onClick={() => handleAnswer(comment)}>
                        Responder
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="row" style={{ display: 'flex' }}>
              <input
                type="text"
                name="new-comment"
                id="new-comment"
                placeholder="Novo comentário"
                onChange={(e) => setCommentContent(e.target.value)}
                onKeyUp={handleDigit}
                value={commentContent}
                ref={peopleInputRef}
              />
              <button onClick={handleComment}>Comentar</button>
              {peopleModal && (
                <div className="mark-profile">
                  <ul className="comments" style={{ borderRadius: '4px' }}>
                    {!peoplesAtComments[0] && (
                      <li className="no-comments">
                        <span>Nenhuma pessoa com esse nome</span>
                      </li>
                    )}
                    {peoplesAtComments.map((comment, index) => (
                      <li
                        className="comment"
                        key={index}
                        onClick={() => handleSelectPeople(comment)}
                      >
                        <img
                          src={comment.url}
                          alt="profile"
                          className="profile"
                        />
                        <div className="text">
                          <h3>{comment.name}</h3>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}

export default Post;
