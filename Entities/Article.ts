import { Column, CreatedAt, Entity, ID, Options, PrimaryColumn, UpdatedAt } from '@Typetron/Database'

@Options({
    table: 'articles',
})
export class Article extends Entity {
    @PrimaryColumn()
    id: ID

    @Column()
    title: string

    @Column()
    content: string

    @Column()
    image: string

    @CreatedAt()
    createdAt: Date

    @UpdatedAt()
    updatedAt: Date
}
