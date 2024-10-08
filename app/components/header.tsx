import { Link } from '@tanstack/react-router'

export const Header: React.FC = () => (
  <header className="sticky inset-0 z-50 border-b bg-background/70 py-2 backdrop-blur-xl backdrop-saturate-150">
    <div className="container flex items-center justify-between gap-4">
      <Link to="/" className="text-2xl font-bold">
        Yuki
      </Link>

      <nav className="flex items-center gap-2">
        {['About', 'Contact', 'FAQs', 'Pricing'].map((name) => (
          <Link
            key={name}
            to={`/${name.toLowerCase()}`}
            className="text-muted-foreground"
            activeProps={{ className: 'text-foreground' }}
          >
            {name}
          </Link>
        ))}
      </nav>
    </div>
  </header>
)
