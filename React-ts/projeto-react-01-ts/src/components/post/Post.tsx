import { ptBR } from 'date-fns/locale';
import { Avatar } from '../avatar/Avatar'
import { Comment } from '../comment/Comment'
import styles from './Post.module.css'
import { format, formatDistanceToNow } from 'date-fns'
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';

interface Author {
    name: string;
    role: string;
    avatarUrl: string;
}

interface PostProps {
    author: Author;
    publishedAt: Date;
    content: Content[];
}

interface Content {
    type: 'paragraph' | 'link';
    content: string;
}

export function Post({ author, publishedAt, content }: PostProps) {
    // Utilizando Intl
    // const publishedDateFormated = new Intl.DateTimeFormat('pt-BR', {
    //     day: '2-digit',
    //     month: 'long',
    //     hour: '2-digit',
    //     minute: '2-digit'
    // }).format(publishedAt)

    //utilizando date-fns
    const publishedDateFormated = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", { locale: ptBR });
    // Repare que a função format, recebe letras, para observar o formato, e as strings que escapam são colocadas entre aspas.
    // Agora queremos calcular o tempo que o post foi publicado, para isso o date-fns também ja tras uma função:
    const publishedDateRelativeToNow = formatDistanceToNow(publishedAt,
        {
            locale: ptBR,
            addSuffix: true
        });
    // Repare que podemos adicionar um prefixo automatico

    //trabalhando com estado:
    const [comments, setComments] = useState([''])

    const [newComment, setNewComment] = useState('')

    function handleCreateNewComment(event: FormEvent) {
        event.preventDefault();
        //usamos o preventDefault, pois vamos colocar a função do submit do formulario, que por padrao, redireciona
        //para outra rota.

        //repare que sempre que atualizamos o estado, passamos um dado novo para ele. Isso ocorre pelo fato de se 
        //prezar pela imutabilidade.
        //Outro ponto. O react trabalha com o conceito de estado pelo fato de que, a cada atualização, ele
        //nao precisa ficar observando alterações, e sim, recebe um aviso(setState), de que aquele dado mudou, e deve ser 
        //atualizado

        // Pegando o valor do campo de comentario:
        //vamos pegar o evento de submit(evento de formulário) para receber o evento:
        setComments([...comments, newComment])
        setNewComment('')
    }

    function handleNewComment(event: ChangeEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity(''); //quando se atribui uma validação, tem de retornar
        // ao estado anterior para nao ficar reclamando de erro sempre
        setNewComment(event.target?.value);
    }

    function deleteComment(commentToBeDeleted: string) {
        const updatedComments = comments.filter(
            comment => comment !== commentToBeDeleted
        )
        console.log(updatedComments)
        console.log('deletado')
        setComments(updatedComments)
    }

    function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('Esse campo é obrigatório');
    }

    const isNewCommentInputEmpty = newComment.length === 0;

    return (
        <article className={styles.post}>
            <header className={styles.postHeader}>
                <div className={styles.author}>
                    <Avatar src={author.avatarUrl} />

                    <div className={styles.authorInfo}>
                        <strong>{author.name}</strong>
                        <span>{author.role}</span>
                    </div>

                </div>
                <time
                    title={publishedDateFormated}
                    dateTime={publishedAt.toISOString()}>
                    {publishedDateRelativeToNow}
                </time>
            </header>

            <div className={styles.content}>
                {content.map((line) => {
                    if (line.type === 'paragraph') {
                        return <p key={line.content}>{line.content}</p>
                    } else if (line.type === 'link') {
                        return <p key={line.content}><a href="#">{line.content}</a></p>
                    }
                })}
            </div>

            <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
                <strong>Deixe seu feedback</strong>

                <textarea
                    value={newComment}
                    placeholder='Deixe seu comentário'
                    onChange={handleNewComment}
                    onInvalid={handleNewCommentInvalid}
                    required
                />

                <footer>
                    <button
                        type='submit'
                        disabled={isNewCommentInputEmpty}
                    >Comentar</button>
                </footer>
            </form>

            <div className={styles.commentsList}>
                {comments.map((comment) => {
                    return <Comment
                        key={comment}
                        onDeleteComment={deleteComment}
                        imgSrc=''
                        author=''
                        content={comment} />
                })}
            </div>
        </article>
    )
}