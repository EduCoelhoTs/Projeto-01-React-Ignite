/* eslint-disable react/prop-types */
import { ThumbsUp, Trash } from 'phosphor-react'
import styles from './Comment.module.css'
import { Avatar } from '../avatar/Avatar'
import { useState } from 'react';

export function Comment({ author, comment, imgSrc, onDeleteComment }) {

    const [likeCount, setLikeCount] = useState(0)

    function handleDeleteComment() {
        onDeleteComment(comment);
    }

    function handleLikeCount() {
        setLikeCount(
            (state) => state + 1
        );
        // state é o estado mais atual do dado.
        // Essa é a forma mais correta, de capturar o estado anterior e substituilo.
        // Passando uma callback, na qual o parametro da função será o estado. 
    }

    return (
        <div className={styles.comment}>
            <Avatar hasBorder={false} src={imgSrc} />

            <div className={styles.commentBox}>
                <div className={styles.commentContent}>
                    <header>
                        <div className={styles.authorAndTime}>
                            <strong>{author}</strong>
                            <time
                                title='11 de Maio as 08:13'
                                dateTime='2022-05-05 08:13:22'>
                                Cerca de 1h atrás
                            </time>
                        </div>

                        <button onClick={handleDeleteComment} title='Deletar o comentário'>
                            <Trash size={24} />
                        </button>

                    </header>

                    <p>{comment}</p>
                </div>
                <footer>
                    <button onClick={handleLikeCount}>
                        <ThumbsUp />
                        Aplaudir <span>{likeCount}</span>
                    </button>
                </footer>
            </div>

        </div>
    )
}