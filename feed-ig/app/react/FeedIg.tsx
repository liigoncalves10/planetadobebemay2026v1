import * as React from 'react'

const FeedIg: React.FC = () => {
  React.useEffect(() => {
    // evita duplicar o script em navegação SPA
    if (document.getElementById('curator-script')) {
      return
    }

    const script = document.createElement('script')
    script.id = 'curator-script'
    script.async = true
    script.charset = 'UTF-8'
    script.src =
      'https://cdn.curator.io/published/62d7c758-9bd0-4771-af31-1ff4156c52cd.js'

    document.body.appendChild(script)
  }, [])

  return (
    <section style={styles.section}>
      {/* Título */}
      <h2 style={styles.title}>Sigam-nos no Instagram</h2>

      <p style={styles.subtitle}>
        Acompanhe novidades, lançamentos e momentos especiais 💛
      </p>

      {/* HEADER MANUAL INSTAGRAM */}
      <div style={styles.profileHeader}>
        <img
          src="https://i.imgur.com/ceQGIo0.jpeg"
          alt="Planeta do Bebê"
          style={styles.avatar}
        />

        <div style={styles.profileInfo}>
          <div style={styles.profileTop}>
            <strong style={styles.username}>
              {/* O texto agora é um link clicável para o Instagram */}
              <a
                href="https://www.instagram.com/lojaplanetadobebe"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                @lojaplanetadobebe
              </a>
            </strong>

            <a
              href="https://www.instagram.com/lojaplanetadobebe"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.followButton}
            >
              Seguir
            </a>
          </div>

          <p style={styles.bio}>
            Brinquedos e acessórios infantis 💛 <br />
            Tudo para o seu bebê em um só lugar
          </p>

          <div style={styles.stats}>
            <span>
              952 publicações
            </span>
            <span>
              31,9 mil seguidores
            </span>
            <span>
              302 seguindo
            </span>
          </div>
        </div>
      </div>

      {/* CURATOR FEED */}
      <div
        id="curator-feed-new-feed-layout"
        style={styles.feedWrapper}
      >
        <a
          href="https://curator.io"
          target="_blank"
          rel="noopener noreferrer"
          className="crt-logo crt-tag"
          style={styles.curatorLink}
        >
          Powered by Curator.io
        </a>
      </div>
    </section>
  )
}

export default FeedIg

const styles: { [key: string]: React.CSSProperties } = {
  section: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '64px 16px',
    textAlign: 'center',
  },

  title: {
    fontSize: '32px',
    fontWeight: 900,
    color: '#333',
    marginBottom: '8px',
  },

  subtitle: {
    fontSize: '16px',
    color: '#666',
    marginBottom: '32px',
  },

  /* ===== HEADER INSTAGRAM ===== */
  profileHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    padding: '16px',
    marginBottom: '32px',
    borderRadius: '16px',
    backgroundColor: '#fafafa',
    textAlign: 'left',
  },

  avatar: {
    width: '96px',
    height: '96px',
    borderRadius: '50%',
    objectFit: 'cover',
  },

  profileInfo: {
    flex: 1,
  },

  profileTop: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '8px',
    flexWrap: 'wrap',
  },

  username: {
    fontSize: '20px',
    fontWeight: 500,
    color: '#262626',
  },

  followButton: {
    backgroundColor: '#0095f6',
    color: '#fff',
    padding: '6px 14px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: 500,
    textDecoration: 'none',
  },

  bio: {
    fontSize: '14px',
    color: '#444',
    lineHeight: 1.4,
    marginBottom: '8px',
  },

  stats: {
    display: 'flex',
    gap: '16px',
    fontSize: '14px',
    color: '#555',
    flexWrap: 'wrap',
  },

  /* ===== CURATOR ===== */
  feedWrapper: {
    maxWidth: '1100px',
    margin: '0 auto',
  },

  curatorLink: {
    fontSize: '12px',
    color: '#999',
    textDecoration: 'none',
  },
}
