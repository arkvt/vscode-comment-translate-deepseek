import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
// import * as myExtension from '../../extension';
import { getThinkingRequestFields, mergeRequestHeaders } from '../../requestOptions';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Sample test', () => {
		assert.strictEqual(-1, [1, 2, 3].indexOf(5));
		assert.strictEqual(-1, [1, 2, 3].indexOf(0));
	});

	test('Disables thinking for supported API types', () => {
		assert.deepStrictEqual(getThinkingRequestFields('openai', 'disabled'), {
			thinking: { type: 'disabled' },
		});
		assert.deepStrictEqual(getThinkingRequestFields('ollama', 'disabled'), {
			think: false,
		});
		assert.deepStrictEqual(getThinkingRequestFields('openai', 'default'), {});
	});

	test('Merges custom headers case-insensitively', () => {
		assert.deepStrictEqual(
			mergeRequestHeaders(
				{ ['Content-Type']: 'application/json', ['Authorization']: 'Bearer default' },
				{ ['content-type']: 'application/custom+json', ['X-No-Think']: 'true' }
			),
			{
				['Authorization']: 'Bearer default',
				['content-type']: 'application/custom+json',
				['X-No-Think']: 'true',
			}
		);
	});
});
