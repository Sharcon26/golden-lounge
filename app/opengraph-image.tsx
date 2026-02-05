import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'GD Lounge & Bar - Premier Nightlife in Miami'
export const size = {
    width: 1200,
    height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: '#070B1A',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '20px solid #D19D5C',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '20px',
                    }}
                >
                    {/* Main Title */}
                    <div
                        style={{
                            fontSize: 100,
                            color: '#D19D5C',
                            fontFamily: 'serif',
                            fontWeight: 900,
                            letterSpacing: '-0.05em',
                            lineHeight: 1,
                            textTransform: 'uppercase',
                            textAlign: 'center',
                        }}
                    >
                        GD LOUNGE
                    </div>

                    {/* Separator Line */}
                    <div
                        style={{
                            width: '150px',
                            height: '4px',
                            backgroundColor: '#D19D5C',
                            marginBottom: '10px',
                        }}
                    />

                    {/* Subtitle */}
                    <div
                        style={{
                            fontSize: 32,
                            color: '#FFFCE5', // Lighter gold/white for contrast
                            fontFamily: 'sans-serif',
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                            textAlign: 'center',
                        }}
                    >
                        Downtown Miami
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
        }
    )
}
