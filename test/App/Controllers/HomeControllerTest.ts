import { suite, test } from '@testdeck/mocha';
import { expect } from 'chai';
import { TestCase } from '../../TestCase';

@suite
class HomeControllerTest extends TestCase {

    @test
    async showsWelcomeMessage() {
        const response = await this.get('api.index');
        expect(response.content).to.be.instanceOf(Array);
    }
}
