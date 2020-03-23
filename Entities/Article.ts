import { Column, CreatedAt, Entity, ID, Meta, UpdatedAt } from '@Typetron/Database';

@Meta({
    table: 'articles'
})
export class Article extends Entity {
    @Column()
    id: ID;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column()
    image: string;

    @CreatedAt()
    createdAt: Date;

    @UpdatedAt()
    updatedAt: Date;
}
