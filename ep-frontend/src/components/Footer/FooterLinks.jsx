export const FooterLinks = ({ links }) => (
    <ul className="space-y-2 text-sm">
      {links.map((link, index) => (
        <li key={index}>
          <a href={link.href} className="hover:text-gray-900">
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );