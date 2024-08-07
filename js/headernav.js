class HeaderNav extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <nav id="nav">
					<ul>
						<li class="current"><a href="index.html">Home</a></li>
						<!-- <li><a href="registration.html">Register</a></li> -->
						<li>
							<a href="#">Register</a>
							<ul>
								<li><a href="registration.html">Registration</a></li>
								<li><a href="scholarship.html">Student Scholarship</a></li>
								<li><a href="call_volunteer.html">Student Volunteer Call</a></li>
							</ul>
						</li>
						<li><a href="#">Submit</a>
							<ul>
								<li><a href="call_paper.html">Call for Papers</a></li>
								<li><a href="call_workshop.html">Call for Workshops & Tutorials</a></li>
								<li><a href="call_special_session.html">Call for Special Sessions</a></li>
								<li><a href="call_abstract.html">Call for Late Breaking Abstract</a></li>
							</ul>
						</li>
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
							<a href="#">Program</a>
							<ul>
								<li><a href="program.html">Timetable</a></li>
								<li><a href="detailed_program.html">Detailed program</a></li>
								<li><a href="keynotes.html">Keynotes</a></li>
								<li><a href="special_sessions.html">Special sessions</a></li>
								<li><a href="workshops.html">Workshops</a></li>
								<li><a href="tutorials.html">Tutorials</a></li>
								<li><a href="mind_matching.html">Mind Matching event</a></li>
								<li><a href="social_event.html">Social events</a></li>
								<li><a href="art_session.html">Art session</a></li>
								<li><a href="hackathon.html">Hackathon</a></li>
								<li><a href="zoom_links.html">Zoom links</a></li>
							</ul>
						</li>
						<li>
							<a href="#">Organization</a>
							<ul>
								<li><a href="organization.html">Committee</a></li>
								<!-- <li><a href="sponsors.html">Sponsors</a></li> -->
								
							</ul>
						</li>
						<li>
							<a href="#">Competitions</a>
							<ul>
								<li><a href="https://sites.google.com/view/vcc-2024" target="_blank" rel="noreferrer noopener">Virtual Creatures Competition</a></li>
								
							</ul>
						</li>
						<li>
							<a href="#">Info</a>
							<ul>
								<li><a href="venue.html">Venue</a></li>
								<li><a href="map.html">Venue map</a></li>
								<li><a href="accommodation.html">Accommodations</a></li>
								<!-- <li><a href="https://www.visitcopenhagen.com/" target="_blank" rel="noreferrer noopener">Copenhagen</a></li> -->
								<li><a href="copenhagen.html">Copenhagen</a></li>
							</ul>
						</li>

					</ul>
				</nav>
    `;
  }
}

customElements.define('header-nav-component', HeaderNav);