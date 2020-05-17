import { formatIllustrationName } from './formatIllustationName';
describe('formatIllustrationName', () => {
  it('should return thunderstorm illustration name if id is from 2xx group', () => {
    expect(formatIllustrationName(231)).toContain('thunderstorm');
  });

  it('should return rain illustration name if id is from 3xx group', () => {
    expect(formatIllustrationName(301)).toContain('rain');
  });

  it('should return rain illustration name if id is from 5xx group', () => {
    expect(formatIllustrationName(502)).toContain('rain');
  });

  it('should return snow illustration name if id is from 6xx group', () => {
    expect(formatIllustrationName(612)).toContain('snow');
  });

  it('should return atmosphere illustration name if id is from 7xx group', () => {
    expect(formatIllustrationName(741)).toContain('atmosphere');
  });

  it('should return clear_sky illustration name if id is 800', () => {
    expect(formatIllustrationName(800)).toContain('clear_sky');
  });

  it('should return cloudy illustration name if id is from 8xx group', () => {
    expect(formatIllustrationName(802)).toContain('cloudy');
  });
});
