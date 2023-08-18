import { ThumbsUp, Trash } from 'phosphor-react'
import styles from './Comment.module.css'
import { Avatar } from '../avatar/Avatar'
import { useState } from 'react';

interface CommentProps {
    content: string;
    onDeleteComment: (comment: string) => void;
    imgSrc: string;
    author: string;
}

export function Comment({ author, content, imgSrc, onDeleteComment }: CommentProps) {

    const [likeCount, setLikeCount] = useState(0)

    function handleDeleteComment() {
        onDeleteComment(content);
    }

    function handleLikeCount() {
        setLikeCount(
            (state) => state + 1
        );
        // state é o estado mais atual do dado. 
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

                    <p>{content}</p>
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