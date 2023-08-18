import { ImgHTMLAttributes } from 'react';
import styles from './Avatar.module.css'

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
    hasBorder?: boolean;
}

export function Avatar({ hasBorder = true, ...props }: AvatarProps) {
    // desestruturando o props:
    return (
        <div>
            <img className={hasBorder ? styles.avatarWithBorder : styles.avatar}
                {...props}
            />
        </div>
    )
}