import { formatRelative, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/esm/locale';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { FiHeart, FiMail, FiMessageCircle, FiX } from 'react-icons/fi';
import ComponentHeader from '../../components/ComponentHeader';
import { UserContext } from '../../context/AuthContext';
import { ToastContext } from '../../context/ToastContext';

import api from '../../services/api';

import { Container } from './styles';

function Post() {
  const [postModal, setPostModal] = useState(false);
  const [commentModal, setCommentModal] = useState(false);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedComment, setSelectedComment] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState('');
  const [peoplesAtComments, setPeoplesAtComments] = useState([]);
  const [peopleModal, setPeopleModal] = useState(false);
  const [selectedPeople, setSelectedPeople] = useState(null);

  const { showToast } = useContext(ToastContext);
  const { token, user } = useContext(UserContext);
  const peopleInputRef = useRef(null);

  useEffect(() => {
    (async () => {
      const tk = localStorage.getItem('PC_TOKEN');

      try {
        const response = await api({
          method: 'GET',
          url: '/company/post',
          headers: {
            authorization: `Bearer ${tk}`,
          },
        });

        setPosts(response.data);
      } catch (error) {
        showToast(error?.response?.data.error || 'Erro desconhecido');
      }
    })();
  }, []);

  function onOpenEditModal(post) {
    setSelectedPost(post);

    setPostModal(true);
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
      console.log('nao passou');
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
          ? `/posts/comment?p=${selectedPost.id}`
          : `/posts/comment?p=${selectedPost.id}&notifyTo=${selectedPeople}&context=employee`,
        data: { content: commentContent },
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      const _selectedPost = selectedPost;
      _selectedPost.comments = [..._selectedPost.comments, response.data];

      setSelectedPost(_selectedPost);
      setCommentContent('');
      setSelectedPeople(null);
    } catch (error) {
      showToast(error.response.data.error);
    }
  }

  return (
    <Container>
      <ComponentHeader
        title="Publicações"
        icon={<FiMail size={25} color="#fff" />}
        style={{ padding: '0 40px' }}
      />
      <div className="content">
        <button>Publicar novo</button>
        <ul className="posts">
          {posts.map((post) => (
            <li onClick={() => onOpenEditModal(post)} key={post.id}>
              <header>
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
                <span>
                  <strong>{post.employee.name}: </strong>
                  {post.title}
                </span>
              </footer>
            </li>
          ))}
        </ul>
      </div>

      {postModal && (
        <div className="post-modal">
          <div className="modal">
            <button onClick={() => setPostModal(false)}>
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
