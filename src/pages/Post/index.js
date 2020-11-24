import React, { useState } from 'react';
import { FiHeart, FiMail, FiMessageCircle, FiX } from 'react-icons/fi';
import ComponentHeader from '../../components/ComponentHeader';

import { Container } from './styles';

function Post() {
  const [postModal, setPostModal] = useState(false);
  const [commentModal, setCommentModal] = useState(false);
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
          <li onClick={() => setPostModal(true)}>
            <header>
              <img
                src="https://images.pexels.com/photos/2078265/pexels-photo-2078265.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                alt="profile"
                className="profile"
              />
              <div className="column">
                <h3>Roberto Freitas</h3>
                <span>Equipe Petscão - há 3 horas</span>
              </div>
            </header>
            <img
              src="https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt="midia"
            />
            <footer>
              <div className="reactions">
                <FiHeart size={16} color="#f25c5c" />
                <span>2155</span>
                <FiMessageCircle size={16} color="#4287f5" />
                <span>0</span>
              </div>
              <span>
                <strong>Roberto Freitas: </strong>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis,
                debitis repudiandae. Ullam quasi doloremque deserunt
              </span>
            </footer>
          </li>
          <li>
            <header>
              <img
                src="https://images.pexels.com/photos/2078265/pexels-photo-2078265.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                alt="profile"
                className="profile"
              />
              <div className="column">
                <h3>Roberto Freitas </h3>
                <span>Equipe Petscão - há 3 horas</span>
              </div>
            </header>
            <img
              src="https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt="midia"
            />
            <footer>
              <div className="reactions">
                <FiHeart size={16} color="#f25c5c" />
                <span>2155</span>
                <FiMessageCircle size={16} color="#4287f5" />
                <span>2155</span>
              </div>
              <span>
                <strong>Roberto Freitas: </strong>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis,
                debitis repudiandae. Ullam quasi doloremque deserunt
              </span>
            </footer>
          </li>
          <li>
            <header>
              <img
                src="https://images.pexels.com/photos/2078265/pexels-photo-2078265.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                alt="profile"
                className="profile"
              />
              <div className="column">
                <h3>Roberto Freitas</h3>
                <span>Equipe Petscão - há 3 horas</span>
              </div>
            </header>
            <img
              src="https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt="midia"
            />
            <footer>
              <div className="reactions">
                <FiHeart size={16} color="#f25c5c" />
                <span>2155</span>
                <FiMessageCircle size={16} color="#4287f5" />
                <span>2155</span>
              </div>
              <span title="text here">
                <strong>Roberto Freitas: </strong>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis,
                debitis repudiandae. Ullam quasi doloremque deserunt Lorem ipsum
                dolor sit amet consectetur adipisicing elit. Omnis, debitis
                repudiandae. Ullam quasi doloremque deserunt Lorem ipsum dolor
                sit amet consectetur adipisicing elit. Omnis, debitis
                repudiandae. Ullam quasi doloremque deserunt
              </span>
            </footer>
          </li>
          <li>
            <header>
              <img
                src="https://images.pexels.com/photos/2078265/pexels-photo-2078265.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                alt="profile"
                className="profile"
              />
              <div className="column">
                <h3>Roberto Freitas</h3>
                <span>Equipe Petscão - há 3 horas</span>
              </div>
            </header>
            <img
              src="https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt="midia"
            />
            <footer>
              <div className="reactions">
                <FiHeart size={16} color="#f25c5c" />
                <span>2155</span>
                <FiMessageCircle size={16} color="#4287f5" />
                <span>2155</span>
              </div>
              <span title="text here">
                <strong>Roberto Freitas: </strong>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis,
                debitis repudiandae. Ullam quasi doloremque deserunt Lorem ipsum
                dolor sit amet consectetur adipisicing elit. Omnis, debitis
                repudiandae. Ullam quasi doloremque deserunt Lorem ipsum dolor
                sit amet consectetur adipisicing elit. Omnis, debitis
                repudiandae. Ullam quasi doloremque deserunt
              </span>
            </footer>
          </li>
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
                src="https://images.pexels.com/photos/2078265/pexels-photo-2078265.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                alt="profile"
                className="profile"
              />
              <div className="column">
                <h3>Roberto Freitas</h3>
                <span>Equipe Petscão - há 3 horas</span>
              </div>
            </header>
            <img
              src="https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt="midia"
            />
            <footer>
              <div className="reactions">
                <FiHeart size={16} color="#f25c5c" />
                <span>2155</span>
                <FiMessageCircle size={16} color="#4287f5" />
                <span>0</span>
              </div>
              <span title="text here">
                <strong>Roberto Freitas: </strong>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis,
                debitis repudiandae. Ullam quasi doloremque deserunt Lorem ipsum
                dolor sit amet consectetur adipisicing elit. Omnis, debitis
                repudiandae. Ullam quasi doloremque deserunt Lorem ipsum dolor
                sit amet consectetur adipisicing elit. Omnis, debitis
                repudiandae. Ullam quasi doloremque deserunt
              </span>
            </footer>
            <ul className="comments">
              <li className="comment">
                <img
                  src="https://images.pexels.com/photos/2078265/pexels-photo-2078265.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                  alt="profile"
                  className="profile"
                />
                <div className="text">
                  <h3>Roberto Freitas</h3>
                  <span>Lorem ipsum a asdoiasjdo ooo asdm</span>
                  <div className="reply">
                    <span onClick={() => setCommentModal(true)}>
                      5 respostas
                    </span>
                    <span onClick={() => setCommentModal(true)}>Responder</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      )}
      {commentModal && (
        <div className="post-modal">
          <div className="modal">
            <button onClick={() => setCommentModal(false)}>
              <FiX size={16} color="#fff" />
            </button>
            <ul className="comments" style={{ borderRadius: '4px' }}>
              <li className="comment">
                <img
                  src="https://images.pexels.com/photos/2078265/pexels-photo-2078265.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                  alt="profile"
                  className="profile"
                />
                <div className="text">
                  <h3>Roberto Freitas</h3>
                  <span>Lorem ipsum a asdoiasjdo ooo asdm</span>
                </div>
              </li>
              <li className="comment">
                <img
                  src="https://images.pexels.com/photos/2078265/pexels-photo-2078265.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                  alt="profile"
                  className="profile"
                />
                <div className="text">
                  <h3>Roberto Freitas</h3>
                  <span>Lorem ipsum a asdoiasjdo ooo asdm</span>
                </div>
              </li>
              <li className="comment">
                <img
                  src="https://images.pexels.com/photos/2078265/pexels-photo-2078265.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                  alt="profile"
                  className="profile"
                />
                <div className="text">
                  <h3>Roberto Freitas</h3>
                  <span>Lorem ipsum a asdoiasjdo ooo asdm</span>
                </div>
              </li>
              <li className="comment">
                <img
                  src="https://images.pexels.com/photos/2078265/pexels-photo-2078265.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                  alt="profile"
                  className="profile"
                />
                <div className="text">
                  <h3>Roberto Freitas</h3>
                  <span>Lorem ipsum a asdoiasjdo ooo asdm</span>
                </div>
              </li>
              <li className="comment">
                <img
                  src="https://images.pexels.com/photos/2078265/pexels-photo-2078265.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                  alt="profile"
                  className="profile"
                />
                <div className="text">
                  <h3>Roberto Freitas</h3>
                  <span>Lorem ipsum a asdoiasjdo ooo asdm</span>
                </div>
              </li>
            </ul>
            <div className="row" style={{ display: 'flex' }}>
              <input
                type="text"
                name="new-comment"
                id="new-comment"
                placeholder="Novo comentário"
              />
              <button>Comentar</button>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}

export default Post;
