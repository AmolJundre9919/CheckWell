import '@testing-library/jest-dom';
import { describe, expect, it, beforeEach, afterEach } from '@jest/globals';
import { ImageAtom } from '../ImageAtom';

describe('ImageAtom', () => {
  let imageAtom: ImageAtom;

  beforeEach(() => {
    imageAtom = new ImageAtom();
    document.body.appendChild(imageAtom);
  });

  afterEach(() => {
    document.body.removeChild(imageAtom);
  });

  it('should render with default props', () => {
    expect(imageAtom.src).toBe('');
    expect(imageAtom.alt).toBe('');
    expect(imageAtom.size).toBe('medium');
    expect(imageAtom.border).toBe('none');
  });

  it('should update attributes correctly', () => {
    imageAtom.setAttribute('src', 'test.jpg');
    imageAtom.setAttribute('alt', 'Test Image');
    imageAtom.setAttribute('size', 'large');
    imageAtom.setAttribute('border', 'rounded');

    expect(imageAtom.src).toBe('test.jpg');
    expect(imageAtom.alt).toBe('Test Image');
    expect(imageAtom.size).toBe('large');
    expect(imageAtom.border).toBe('rounded');
  });

  it('should handle custom dimensions', () => {
    imageAtom.setAttribute('width', '300');
    imageAtom.setAttribute('height', '200');

    expect(imageAtom.width).toBe(300);
    expect(imageAtom.height).toBe(200);
  });
}); 