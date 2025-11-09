import React from "react";

export default function Footer() {
  return (
    <footer className="text-center text-md-start fade-in">
      <div className="container">
        <div className="row text-start">
          <div className="col-md-3 mb-4">
            <h3 className="footer-logo">🎬 MovieVault</h3>
            <p>Your premium destination for cinematic experiences — discover, stream, and enjoy movies with ease.</p>
          </div>

          <div className="col-md-3 mb-4">
            <h5>Company</h5>
            <a href="#">About Us</a>
            <a href="#">Careers</a>
            <a href="#">Press</a>
            <a href="#">Terms of Service</a>
          </div>

          <div className="col-md-3 mb-4">
            <h5>Browse</h5>
            <a href="#">Popular</a>
            <a href="#">Now Playing</a>
            <a href="#">Upcoming</a>
            <a href="#">Top Rated</a>
          </div>

          <div className="col-md-3 mb-4">
            <h5>Get In Touch</h5>
            <p>📍 123 Movie St, Cinema City, CA 90210</p>
            <p>📧 support@movievault.com</p>
            <p>📞 +1 (555) 123-4567</p>
            <div className="footer-social mt-3">
              <a href="#"><i className="bi bi-facebook"></i></a>
              <a href="#"><i className="bi bi-twitter-x"></i></a>
              <a href="#"><i className="bi bi-instagram"></i></a>
            </div>
          </div>
        </div>
        <div className="text-center mt-4 border-top pt-3" style={{color:'#777'}}>
          © 2025 MovieVault. All rights reserved. Powered by TMDB.
        </div>
      </div>
    </footer>
  );
}
