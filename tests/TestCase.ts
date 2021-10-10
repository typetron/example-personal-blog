import { TestCase as BaseTestCase } from '@Typetron/Testing/TestCase'
import { Application } from '@Typetron/Framework'
import * as path from 'path'

export class TestCase extends BaseTestCase {

    async bootstrapApp() {
        return await Application.create(path.join(__dirname, '..'))
    }
}
