class HeaderNav extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <nav id="nav">
					<ul>
						<li class="current"><a href="index.html">Home</a></li>
						<!-- <li><a href="#">Submit</a>
							<ul>
								<li><a href="submit_paper.html">Call for Papers</a></li>
								<li><a href="submit_abstract.html">Call for Abstracts</a></li>
								<li><a href="submit_tutorial.html">Call for Tutorials</a></li>
							</ul>
						</li> -->
						<!-- <li> -->
							<!-- <a href="#">Attend</a> -->
							<!-- <ul> -->
								<!-- <li><a href="register.html">Register</a></li> -->
								<!-- <li><a href="venue.html">Venue</a></li> -->
								<!-- <li><a href="accommodation.html">Accommodation</a></li> -->

							<!-- </ul> -->
						<!-- </li> -->
						<!-- <li>
							<a href="#">Program</a>
							<ul>
								<li><a href="program.html">Program</a></li>
								
								<li><a href="keynotes.html">Keynotes</a></li>
								<li><a href="tutorials.html">Tutorials</a></li>
								<li><a href="match_making.html">Match making session</a></li>
								<li><a href="hackathon.html">Hackathon</a></li>
								
								<li><a href="social_event.html">Social event</a></li>
							</ul>
						</li> -->
						<li>
							<a href="#">Organization</a>
							<ul>
								<li><a href="organization.html">Organizers</a></li>
								<!-- <li><a href="sponsors.html">Sponsors</a></li> -->
								
							</ul>
						</li>

					</ul>
				</nav>
    `;
  }
}

customElements.define('header-nav-component', HeaderNav);